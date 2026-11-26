package com.music.bitchord.ui.onboarding

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.widthIn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.music.bitchord.R
import com.music.bitchord.sharedui.resources.Res
import com.music.bitchord.sharedui.resources.ic_google_g
import com.music.bitchord.sharedui.resources.ic_logo
import org.jetbrains.compose.resources.painterResource
import com.music.bitchord.ui.player.MeshGradientBackground
import com.music.bitchord.ui.player.MESH_CYCLE_MILLIS
import com.music.bitchord.ui.player.MeshPalette
import com.music.bitchord.ui.player.cyclingMeshPalette

/**
 * The welcome page: the YouTube sign-in, with a skip for going without.
 *
 * Shown once — to new installs and, because the flag it sets is new, to anyone
 * updating from a build without it. Nothing to sign into here for an account
 * that is already signed in: asking somebody to connect what is connected reads
 * as the app having forgotten them.
 *
 * Always drawn dark, whatever the theme, for the same reason Replay is: the
 * mesh is colour, and white type is what sits on colour.
 */
@Composable
fun OnboardingScreen(
    signedIn: Boolean,
    /** Opens the Google sign-in. The caller finishes onboarding once it lands. */
    onSignIn: () -> Unit,
    onFinish: () -> Unit,
    modifier: Modifier = Modifier,
) {
    // Already signed in: there is nothing to connect, so the welcome ends
    // the moment it appears.
    LaunchedEffect(signedIn) {
        if (signedIn) onFinish()
    }

    // The mesh never settles on one palette: each crossfade is as long as the
    // hold, so one runs straight into the next.
    val palette = cyclingMeshPalette(ConnectPalettes)

    Box(
        modifier
            .fillMaxSize()
            .background(Color.Black),
    ) {
        MeshGradientBackground(
            palette = palette,
            trackKey = Unit,
            continuous = true,
            driftMillis = 6_000,
            colorFadeMillis = MESH_CYCLE_MILLIS,
        )
        // The mesh carries its own light scrim for a player's controls; two
        // full-width buttons and a paragraph want the foot of it a shade deeper.
        Box(
            Modifier
                .fillMaxSize()
                .background(
                    Brush.verticalGradient(
                        0f to Color.Black.copy(alpha = 0.05f),
                        0.55f to Color.Transparent,
                        1f to Color.Black.copy(alpha = 0.45f),
                    ),
                ),
        )

        Box(
            Modifier
                .fillMaxSize()
                .systemBarsPadding(),
        ) {
            OnboardingPage {
                Spacer(Modifier.height(16.dp))
                Image(
                    painter = painterResource(Res.drawable.ic_logo),
                    contentDescription = null,
                    modifier = Modifier.size(width = 46.dp, height = 30.dp),
                )
                Spacer(Modifier.height(20.dp))
                Title(stringResource(R.string.onboarding_connect_title))
                Spacer(Modifier.height(14.dp))
                Text(
                    text = stringResource(R.string.onboarding_connect_body),
                    style = MaterialTheme.typography.bodyLarge,
                    fontSize = 17.sp,
                    lineHeight = 23.sp,
                    color = Color.White.copy(alpha = 0.72f),
                )

                Spacer(Modifier.weight(1f))

                PillButton(
                    label = stringResource(R.string.onboarding_sign_in_google),
                    onClick = onSignIn,
                    primary = true,
                    leading = {
                        Image(
                            painter = painterResource(Res.drawable.ic_google_g),
                            contentDescription = null,
                            modifier = Modifier.size(20.dp),
                        )
                    },
                )
                Spacer(Modifier.height(12.dp))
                PillButton(
                    label = stringResource(R.string.onboarding_skip_sign_in),
                    onClick = onFinish,
                    primary = false,
                )
                Spacer(Modifier.height(16.dp))
            }
        }
    }
}

/** The column the page is laid out in, capped so a tablet doesn't stretch it. */
@Composable
private fun OnboardingPage(content: @Composable ColumnScope.() -> Unit) {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.TopCenter) {
        Column(
            Modifier
                .fillMaxSize()
                .widthIn(max = 520.dp)
                .padding(horizontal = 28.dp),
            content = content,
        )
    }
}

/** Replay's heading, scaled up: the one line the page exists to say. */
@Composable
private fun Title(text: String) {
    Text(
        text = text,
        style = MaterialTheme.typography.displayLarge.copy(
            fontSize = 40.sp,
            lineHeight = 44.sp,
            letterSpacing = (-1.2).sp,
        ),
        color = Color.White,
    )
}

/**
 * A full-width capsule. Primary is white on the mesh, the way Apple Music's
 * own welcome sheet does it; secondary is the same shape in frosted white, so
 * the pair reads as a choice rather than a button and an afterthought.
 */
@Composable
private fun PillButton(
    label: String,
    onClick: () -> Unit,
    primary: Boolean,
    enabled: Boolean = true,
    leading: (@Composable () -> Unit)? = null,
) {
    val interaction = remember { MutableInteractionSource() }
    val pressed by interaction.collectIsPressedAsState()
    val scale by animateFloatAsState(if (pressed) 0.97f else 1f, spring(stiffness = 900f), label = "pillScale")
    val alpha by animateFloatAsState(if (enabled) 1f else 0.4f, tween(180), label = "pillAlpha")
    Row(
        Modifier
            .fillMaxWidth()
            .height(56.dp)
            .graphicsLayer {
                scaleX = scale
                scaleY = scale
                this.alpha = alpha
            }
            .clip(CircleShape)
            .background(if (primary) Color.White else Color.White.copy(alpha = 0.16f))
            .clickable(
                interactionSource = interaction,
                indication = null,
                enabled = enabled,
                onClick = onClick,
            ),
        horizontalArrangement = Arrangement.Center,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        if (leading != null) {
            leading()
            Spacer(Modifier.width(10.dp))
        }
        Text(
            text = label,
            style = MaterialTheme.typography.titleMedium,
            fontSize = 17.sp,
            fontWeight = FontWeight.W700,
            color = if (primary) Color.Black else Color.White,
            textAlign = TextAlign.Center,
            maxLines = 1,
        )
    }
}

/** The account page keeps leaning into YouTube's red while it moves. */
private val ConnectPalettes = listOf(
    MeshPalette(listOf(Color(0xFFFF1E3C), Color(0xFFC2185B), Color(0xFFFF8F3D), Color(0xFF4A1C8C))),
    MeshPalette(listOf(Color(0xFFE53935), Color(0xFFFF6E40), Color(0xFFAD1457), Color(0xFF311B92))),
    MeshPalette(listOf(Color(0xFFFF3D00), Color(0xFFD81B60), Color(0xFF8E24AA), Color(0xFFB71C1C))),
    MeshPalette(listOf(Color(0xFFF50057), Color(0xFFFF9100), Color(0xFFC51162), Color(0xFF4527A0))),
)
