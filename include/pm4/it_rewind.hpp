#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItRewindDef {
    static constexpr std::uint8_t opcode = 0x3e;
    static constexpr std::string_view name = "IT_REWIND";
    static constexpr std::string_view desc = "Rewind ring buffer fetch pointer back to circular ring start";
};
}
